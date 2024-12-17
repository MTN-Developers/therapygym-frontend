/**
 * Stream video into container
 * @param {HTMLElement} container
 * @param {string} streamName
 * @param {boolean} useAES set to true to enable AES encryption
 */
function StreamVideo(container, video1, streamName, useAES) {
  if (useAES) {
    if (
      typeof window.crypto == "undefined" ||
      typeof window.crypto.subtle == "undefined" ||
      typeof window.crypto.subtle.decrypt == "undefined"
    ) {
      console.warn("SubtleCrypto isn't supported, turning AES off");
      useAES = false;
    }
  }
  const canvas =
    container instanceof HTMLCanvasElement
      ? container
      : container.querySelectorAll("canvas")[0];
  if (!canvas) {
    console.error("No canvas element found in container");
    return;
  }
  const ctx = canvas.getContext("2d");
  // Canvas 2D context

  const video = document.createElement("video"); // Even though we use canvas, we still need in-memory only HTML5 video player to get video texture

  const controls = container.querySelectorAll("div.video-controls")[0] || false;
  const videoTimestamp =
    container.querySelectorAll("div.video-time")[0] || false;
  const videoTotalTime =
    container.querySelectorAll("div.video-total-time")[0] || false;
  const videoSizer =
    container.querySelectorAll("div.video-track-sizer")[0] || false;
  const videoLine =
    container.querySelectorAll("div.video-track-line")[0] || false;
  const videoFullscreen =
    container.querySelectorAll("div.video-fullscreen")[0] || false;

  const logo = new Image();
  const vignete = new Image();
  vignete.src = "/image/vignete.png";
  logo.src = "/image/logo.png";

  const videoBuffers = [];

  /**
   * Stringify time
   * @param {number} t
   * @param {boolean?} includeHour
   */
  function toHumanTime(t, includeHour) {
    includeHour = includeHour || false;
    const s = Math.floor(t) % 60;
    const min = Math.floor(t / 60) % 60;
    const hr = Math.floor(t / 3600);
    const strSeconds = s < 10 ? "0" + s : s;
    const strMin = min < 10 ? "0" + min : min;
    const strHr = hr;
    if (includeHour) {
      return `${strHr}:${strMin}:${strSeconds}`;
    }
    return `${strMin}:${strSeconds}`;
  }

  /**
   * When meta-data is ready, we can finally display info as total video time
   */
  video.addEventListener("loadedmetadata", function () {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    if (videoTotalTime) {
      videoTotalTime.textContent = toHumanTime(
        video.duration,
        video.duration >= 3600
      );
    }
  });

  /**
   * As video keeps playing, we need to update interface as well
   */
  video.addEventListener("timeupdate", function () {
    if (videoTimestamp) {
      const includeHour = video.duration >= 3600;
      videoTimestamp.textContent = toHumanTime(video.currentTime, includeHour);
    }
    if (videoLine) {
      console.log("videoLine");

      // Create elements that will serve to display buffered parts of video (those gray chunks)
      for (var i = videoBuffers.length; i < video.buffered.length; i++) {
        const videoBuffer = document.createElement("div");
        videoBuffer.className = "video-track-buffer";
        videoLine.appendChild(videoBuffer);
        videoBuffers.push(videoBuffer);
      }
      // Set positions and widths of those elements correspondingly
      for (var i = 0; i < video.buffered.length; i++) {
        const start = video.buffered.start(i);
        const length = video.buffered.end(i) - start;
        const left = (100 * start) / video.duration;
        const width = (100 * length) / video.duration;
        videoBuffers[i].style.left = left + "%";
        videoBuffers[i].style.width = width + "%";
      }
    }
    if (videoSizer) {
      // Set width of video progress bar (that yellow line)
      videoSizer.style.width = (100 * video.currentTime) / video.duration + "%";
    }
  });

  if (videoLine) {
    console.log("videoLine2");

    // When user clicks on the track line, we need to seek video to that part
    videoLine.addEventListener("click", function (event) {
      if (typeof event.clientX != "undefined") {
        // Calculate timestamp where user clicked
        const rect = videoLine.getBoundingClientRect();
        const width = rect.width;
        const left = rect.left;
        const posX = event.clientX - left;
        const t = (posX / width) * video.duration;
        // First pause
        video.pause();
        video.currentTime = t;
        // Then resume (so fetching chunks doesn't go all crazy)
        playVideo();
      }
    });
  }

  let isFullscreen = false,
    lastEvent = Date.now();

  function toggleFullscreen() {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  }

  if (videoFullscreen) {
    videoFullscreen.addEventListener("click", toggleFullscreen);
  }

  // Add comfort of double clicking on video to toggle fullscreen
  canvas.addEventListener("dblclick", toggleFullscreen);

  // We shall also show controls if user interacted with player or moved mouse
  canvas.addEventListener("mousemove", showControls);
  canvas.addEventListener("mousedown", showControls);
  canvas.addEventListener("touchstart", showControls);

  document.addEventListener("fullscreenchange", function () {
    var fullscreenElement =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement;
    if (fullscreenElement != null) {
      isFullscreen = true;
    } else {
      isFullscreen = false;
    }
  });

  let reqeustedFrame = false;

  function showControls() {
    lastEvent = Date.now();
    canvas.style.cursor = "";
    if (controls) controls.style.display = "";
  }

  function hideControls() {
    canvas.style.cursor = "none";
    if (controls) controls.style.display = "none";
  }

  /**
   * Safely request frame, to make sure we don't request same frame twice
   * @param {() => void} fn callback
   */
  function safeRequestFrame(fn) {
    if (reqeustedFrame) return false;
    requestAnimationFrame(function () {
      reqeustedFrame = false;
      fn();
    });
  }

  /**
   * Update video render
   */
  function onFrame() {
    // If aspect ratio differs, we need to adjust video resolution and position within canvas
    const rect = canvas.getBoundingClientRect();
    const cRatio = rect.width / rect.height;
    const vRatio = canvas.width / canvas.height;
    const size = { x: 0, y: 0, width: canvas.width, height: canvas.height };
    if (vRatio > cRatio) {
      const ratio = vRatio / cRatio;
      size.height = canvas.height / ratio;
      size.y = (canvas.height - size.height) / 2;
    } else {
      const ratio = cRatio / vRatio;
      size.width = canvas.width / ratio;
      size.x = (canvas.width - size.width) / 2;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.drawImage(video, size.x, size.y, size.width, size.height);

    // If we already successfuly communicated session
    // we shall render DRM (a.k.a. watermark)
    if (typeof dheParams.SID != "undefined" && dheParams.SID) {
      // Idea with DRM is simple
      // we split video into 5 second chunks and render a watermark
      // we then get n-th bit of session ID, where n is ID of chunk
      // currently being played, i.e. in 7th second, it's 2nd chunk
      // and if this bit is 0, watermark is semi-transparent
      // and if this bit is 1, watermark if fully opaque
      const sid = Uint8Array.from(atob(dheParams.SID), (c) => c.charCodeAt(0));
      const pointer = Math.floor(video.currentTime / 5) % (16 * 8);
      const logoId = (sid[(pointer >> 3) % 16] >> (pointer & 7)) & 1;
      const logoSize = 48;
      const logoPadding = 8;
      let alpha = 0.4;
      if (logoId) {
        // To make it less suspicios why transparency level is changing
        // we can apply some smooth transition
        alpha +=
          Math.max(0, Math.sin(2 * 0.2 * Math.PI * video.currentTime)) *
          (1 - alpha);
      }
      // Optionally we can render slight vignete effect behind watermark
      ctx.drawImage(
        vignete,
        canvas.width - logoSize - logoPadding,
        canvas.height - logoSize - logoPadding,
        logoSize + logoPadding,
        logoSize + logoPadding
      );
      ctx.globalAlpha = alpha;
      // and now we finally draw watermark
      ctx.drawImage(
        logo,
        canvas.width - logoSize - logoPadding,
        canvas.height - logoSize - logoPadding,
        logoSize,
        logoSize
      );
    }

    // In order not to waste resources, we shouldn't render video is player is stopped
    if (!video.paused) {
      safeRequestFrame(onFrame);
      if (Date.now() - lastEvent > 2500) {
        hideControls();
      }
    } else showControls();
  }

  function playVideo() {
    video.play();
    safeRequestFrame(onFrame);
  }
  const action = document.querySelector(".play");
  const actionplus10 = document.querySelector(".fast");

  canvas.addEventListener("click", () => {
    console.log(video);
    if (video.paused) {
      playVideo();
    } else video.pause();
  });
  var volumeControl = document.getElementById("vol-control");

  volumeControl.addEventListener("change", function () {
    video.volume = this.value / 100;
  });
  actionplus10.onclick = () => {
    // const t = posX / width * video.duration;
    if (video.currentTime + 10 > video.duration) {
      video.pause();
      video.currentTime = video.duration;
      playVideo();
    } else {
      video.pause();
      // First pause
      // video.pause();
      video.currentTime = video.currentTime + 10;
      // Then resume (so fetching chunks doesn't go all crazy)
      playVideo();
      // video.muted=true;
      // console.log("running");
    }
  };
  const pip = document.querySelector("#btn");

  pip.onclick = async () => {
    //  container.width=100 ;
    //container.height=100 ;
    // Open a Picture-in-Picture window.

    const pipWindow = await documentPictureInPicture.requestWindow({
      width: 640,
      height: 360,
    });
    [...document.styleSheets].forEach((styleSheet) => {
      try {
        const cssRules = [...styleSheet.cssRules]
          .map((rule) => rule.cssText)
          .join("");
        const style = document.createElement("style");

        style.textContent = cssRules;
        pipWindow.document.head.appendChild(style);
      } catch (e) {
        const link = document.createElement("link");

        link.rel = "stylesheet";
        link.type = styleSheet.type;
        link.media = styleSheet.media;
        link.href = styleSheet.href;
        pipWindow.document.head.appendChild(link);
      }
    });
    let player4 = document.getElementById("play");

    // console.log(pipWindow);
    // Move the player to the Picture-in-Picture window.
    var player2 = container; // document.getElementById("play");
    let oldw = player4.width;
    let oldh = player4.height;
    //   let player4=document.getElementById("play")
    //   console.log(canvas.height,canvas.width);
    container.className = "videopip";
    player2.width = player2.width * 0.2;
    player2.height = player2.height * 0.2;
    //   onFrame();
    //   canvas.width=canvas.width*.2;
    //   canvas.height=canvas.height*.2;
    pipWindow.document.body.append(player2);

    pipWindow.addEventListener("pagehide", (event) => {
      // const playerContainer = document.querySelector("#playerContainer");
      // const pipPlayer = event.target.querySelector("#player");
      document.getElementById("parent").append(player2);
      onFrame();
      container.className = "video";

      player4.width = oldw;
      player4.height = oldh;
    });
    // video.requestPictureInPicture();
    //ctx.display='none';
  };
  action.onclick = () => {
    console.log("running");
    if (video.paused) {
      action.className = "pause";
      playVideo();
    } else {
      video.pause();

      action.className = "play";
    }
  };
  function modExp(a, b, n) {
    a = a % n;
    var result = 1n;
    var x = a;
    while (b > 0) {
      var leastSignificantBit = b % 2n;
      b = b / 2n;
      if (leastSignificantBit == 1n) {
        result = result * x;
        result = result % n;
      }
      x = x * x;
      x = x % n;
    }
    return result;
  }

  // Well, screw IE which doesn't even support bigint anyways :D
  const dheA = new Uint8Array(2048);
  window.crypto.getRandomValues(dheA);
  console.log(dheA);
  const dheParams = {
    p: 25099552766942844933223712235716091924152211550465978680129705202709825360278218096296475379609912444439100980928458239353017482832501866454661094006858424772934884873555199514015711013309014645273730865676502244977060845958886335682411812280653235841465862277254600577554669166523762471112389048884049340166194531521686494178404450414366125027213409901448898349767842311013845893036244352637776318882319722220320245761316160828664005354775978963282315190208049614991040761108728905230322535871785511823330701036582783051238652129305810884107554563790322733394693439028109856194511421092271254974073093909506851549997n,
    g: 3n,
    a: BigInt(
      "0x0038004345900890071319500025003100377140732154000000003223250100000709556880480002100300012759002500094000000480860729531000053176406412360076650317041082000054184000220000000000216508680003486002300000058000091000500021096026087000000004808600930036000001950007025099093300003965000427400036049890970770047500087073069660000088526200009400870300081290960461938310710003505900080605330004262000462500003213320003570820427920390000010880000003500003876156000025043020000232200021221867045079062000880600130841610000013830114000070390078000430040000660410000310000380000680250260079210000700000289193906175872000075000045000004800036806501318000500095580283490948552100022170000006549020825200000410000004500303240082038000169700008884000531693000250007600000003072078364000483046067395602300605200412326000036703508083004502560078002477700008007285001830038690097000224984008000053600653351580009901314520064580000000063000053464200740051041006856020000900680572402608000680000000025330400007300067009806140000354800000502923000000203400008503200890330407900000101900063000202400002510000000420578181790004473000000009123007506600009100890710349204600580035000009900590221300309540633060000746602900444500000004900050001000641642033822700025800071029034002745242315000280000054440000674900540710000050018020104677690071000024068683800009750110050006030390003201300303000698700011000046001200027071062009514558300850000990000000000000095754026285605660000000703031073064189595710000240001700027000021637500037031254593835656000000074002193770051890052012012770000065420008523000076000300140031533119200099671104550467270002028629791603815000610470169104800005540057058470012316729051000000085090087000660086000121486700372900000007702008000006796085002915097292700890791653004003400000350145300900900075260681007700400728400000000470008540010009900483198100000000004300000000000300000750110000000084054049846000000074072820006200380088000032870042276631009409200086394507103403637170849299370004800002355820710043943000000021006607003300066563000005800335800061057680000790000406406509500025000500000000014000018086000091400760018667130048000021000982600063004400056959007300140000390000035202667970530151900000000000065775258394705300760002200000750600040008506700000006400000027820653304403316000402176112701301874530000060620000004303736000820000000000006478640009608497000001000490075094140000510068690035006061236990000029000000240890053920090006027700522554530000000665902700000000058000003500096000050000000087009507220682612254105007506900050001035640009382000014064750084160044540002888025065860000418833700097016471100090288306704500000000020000000000041052830008600039035651608300000730503900732254000000901155310000000970004100000670000670623802200000000340197456000"
    ),
    //BigInt("0x" + dheA.map( o => o < 16 ? "0" + o.toString(16) : o.toString(16)).join(""))
  };
  dheParams.A = modExp(dheParams.g, dheParams.a, dheParams.p);

  /**
   * Fetch video meta-data
   * @param {string} streamName
   * @param {*} callback
   */
  let videoId = "astrogym-clips-1__1st_session";
  let coursename = videoId.split("__")[0];
  let filename = videoId.split("__")[1];
  let ChunkURl = "https://" + coursename + ".itcraft-eg.com/" + filename + "/";
  function fetchManifest(streamName, callback) {
    var xhr = new XMLHttpRequest();
    const start = Date.now();
    xhr.onload = () => {
      // dheParams.B = BigInt("0x" + xhr.getResponseHeader("DHEB"));
      // dheParams.K = modExp(dheParams.B, dheParams.a, dheParams.p);
      dheParams.SID = xhr.getResponseHeader("SID");
      // // Calculate shared key, shared key = sha256(B^a mod p)
      // dheParams.S = sha256(dheParams.K.toString(16));
      dheParams.S =
        "ce6dfa8ae4388604d45b2d6a749494ab7409b6902ac2b1f8d4c3e00ee1089ab3";
      console.log("DHES: ", dheParams.S);
      const helper = [];
      for (let i = 0; i < dheParams.S.length; i += 2) {
        helper.push(parseInt(dheParams.S.substr(i, 2), 16) & 0xff);
      }
      dheParams.S = new Uint8Array(helper);
      console.log("Session initialization took " + (Date.now() - start) + "ms");
      callback(xhr.response);
    };

    xhr.open(
      "GET",
      "https://nodejsclusters-189110-0.cloudclusters.net/stream/" + videoId
    );
    xhr.responseType = "json";
    // xhr.open("GET", "https://pub-ff32decddd604a04bde487eb84d2631c.r2.dev/day2.mpd")

    // Send our Diffie-Hellman parameters to server
    xhr.setRequestHeader("DHEP", dheParams.p.toString(16));
    xhr.setRequestHeader("DHEG", dheParams.g.toString(16));
    xhr.setRequestHeader("DHEA", dheParams.A.toString(16));
    xhr.setRequestHeader("DHEA1", dheParams.a);
    // xhr.setRequestHeader("DHEP", "c6d3a6564ab4cae2a55b68a3eacdaa176e8db2ac08b58c4063dc2027554842b576c33886b0de94ad6960e510b1dfc595a42bbbeea71879b70610cb20c4541115048182eb982f4f7f52f01d224ae9ec0db7d35a9aa3b954b92b06dc6e96b4cfbadd901405c481a54c01a6d13ae5d10769bb1257e18b5fee35be495ecde67727139eb41adf20c08b780bc3d93800d2e5e3e9b54ed76991ff924c0e4c8bc20c0cd30f778dbc25b10e2c8962e94e875671fd32a9b000cd9399affd9d782a3513c8026d3f6666891c0946a8eff1f177418d0021a467e77ef15838bf1f4582f56ecde3a4e9bb6e0c897da6761a7addbcf44aabd8edc8cc657b28a3ecdebc13032f332d");
    // xhr.setRequestHeader("DHEG", "3");
    // xhr.setRequestHeader("DHEA", "247f4b84e0851c2066325de0ab5e12b0d91bbd17b2360bba18a2dc40fd13bf9c17672ec003c342fd802d2a6024eee5f0baca93282502162f3a838ac3cf3a3727469ea851a6ef4b88acfe21c9a46ef6c0d38d0eea6c91a3bb75543905bb15939df9e452a4151c4a99a0adae727190578c6175f554e53e94cdffafc4cefe669571ed1173770f3ad4d1b2d362bc8433aca71102c6708756b5ef11a927320da9ea6ea5e20ff992269b806d7b0a331153a341589facb1ba9d4dfca73a50e14c3ce35e275e2c276e9a305b8db85a6b2543601aa094203d401590dce65456e210c8746e15123ab191f5ea38c782e219bb56c674b7a51f982f6818e361ec86de4c4e1907");
    xhr.send();
  }

  // Fetch video data and create media source with streams
  fetchManifest(streamName, (manifest) => {
    var mediaSource = new MediaSource();
    mediaSource.addEventListener("sourceopen", (event) => {
      let durationSet = false;

      /**
       * Create new stream for given media source
       * @param {*} streamId stream id
       * @param {*} stream stream info
       */
      function AddSource(streamId, stream) {
        const representation = stream.representation;
        const timeline = stream.timeline;

        const mimeCodec = `${representation.mimeType}; codecs="${representation.codecs}"`;
        // console.log(mimeCodec);
        const loadedChunks = {};
        const stops = [];
        const bufferStepSize = 2;
        const bufferSteps = 10;
        let duration = 0;
        let stopCtr = 1;

        // Compute total video duration and pre-calculate stops
        for (let i = 0; i < timeline.length; i++) {
          console.log("sss");
          for (let j = 0; j <= timeline[i].r; j++, stopCtr++) {
            stops.push({
              id: stopCtr,
              t:
                stops.length == 0
                  ? 0
                  : stops[stops.length - 1].t + stops[stops.length - 1].d,
              d: timeline[i].d,
            });
            duration += timeline[i].d;
          }
        }

        // Get ID of chunk for given MPEG-DASH stream
        function getStop(time) {
          for (let i = 0; i < stops.length; i++) {
            if (time >= stops[i].t && time < stops[i].t + stops[i].d) {
              return stops[i].id;
            }
          }
          return false;
        }

        /**
         * Decrypt data
         * @param {*} data
         * @param {*} useAES
         */
        async function decrypt(data, useAES, chunkId, streamId) {
          async function decryptChunk(view) {
            const key = await crypto.subtle.importKey(
              "raw",
              dheParams.S,
              "AES-GCM",
              false,
              ["encrypt", "decrypt"]
            );
            const tag = view.subarray(view.length - 32, view.length - 16);
            const iv = view.subarray(view.length - 16, view.length);
            const result = await window.crypto.subtle.decrypt(
              {
                name: "AES-GCM",
                iv: iv,
                tagLength: 128,
              },
              key,
              view.subarray(0, view.length - 16)
            );
            console.log(new Uint8Array(result), chunkId, streamId);

            return new Uint8Array(result);
          }
          let results = [],
            result = null;

          // We can either use AES for decryption or our simplistic XOR stream cipher
          // The problem with AES is that it is kinda slow so it would be better to
          // relay that work to separate web workers in next iteration of this project
          // but that's far ahead future and for now, it works just right for proof
          // of concept
          if (useAES) {
            try {
              let pointer = 0,
                cycles = 0;
              while (true) {
                const header = data.subarray(pointer, pointer + 4);
                const length =
                  (header[0] << 24) |
                  (header[1] << 16) |
                  (header[2] << 8) |
                  header[3];
                results.push(
                  decryptChunk(data.subarray(pointer + 4, pointer + 4 + length))
                );
                pointer += length + 4;
                cycles++;
                if (pointer >= data.length) break;
              }
              result = new Uint8Array(
                (await Promise.all(results)).reduce(
                  (acc, curr) => [...acc, ...curr],
                  []
                )
              );
            } catch (ex) {
              console.log("Decrypt failed: ", ex);
            }
          } else {
            const key = dheParams.S;
            console.log(key);
            for (let i = 0, ctr = 0; i < data.length; i++, ctr++) {
              data[i] =
                (data[i] ^
                  ((key[ctr % key.length] +
                    ctr +
                    parseInt(chunkId) * 3 +
                    parseInt(streamId)) &
                    0xff)) &
                0xff;
            }
            result = data;
            console.log(data, "----", chunkId, streamId);
          }
          return result;
        }

        const activeRequests = {};

        // Fetch single chunk into source buffer
        function fetchChunk(sourceBuffer, streamId, chunkId, callback) {
          //console.log("Try ", streamId, chunkId);
          if (chunkId in activeRequests) return false;
          if (chunkId in loadedChunks) return false;

          var xhr = new XMLHttpRequest();
          xhr.onload = async () => {
            loadedChunks[chunkId] = true;
            var res = xhr.response;
            // console.log(res,streamId);
            let view = new Uint8Array(xhr.response);
            //console.log(res,view);

            // Once chunk is loaded, we ought to decrypt it with our shared key

            const decrypted = await decrypt(view, useAES, chunkId, streamId);
            // Source buffer doesn't really work in an instant
            // and therefore we must only append new buffer
            // when previous buffer was successfuly appended.
            // Therefore we use `finished` variable, which is
            // true only if source buffer is ready, otherwise
            // we push video into demand buffer, which will later
            // be appended to source buffer
            if (finished) {
              // Set buffer as not ready as we are appending new buffer
              finished = false;
              sourceBuffer.appendBuffer(decrypted);
              //console.log(streamId)
            } else {
              //console.log(streamId,'else')

              demand.push(decrypted);
            }
            typeof callback == "function" && callback(decrypted);
          };
          let chunkstr = "";
          console.log(chunkId);
          if (chunkId < 10) chunkstr = "0000" + chunkId;
          if (chunkId >= 10 && chunkId < 100) chunkstr = "000" + chunkId;
          if (chunkId >= 100 && chunkId < 1000) chunkstr = "00" + chunkId;
          if (chunkId >= 1000 && chunkId < 10000) chunkstr = "0" + chunkId;
          if (chunkId >= 10000 && chunkId < 100000) chunkstr = chunkId;

          // xhr.open("GET", "/stream/"+streamName+"/"+streamId+"/"+chunkId);
          if (chunkId == 0)
            //    xhr.open("GET", "/"+streamName+"/init-stream"+streamId+".m4s");

            xhr.open("GET", ChunkURl + "init-stream" + streamId + ".m4s");
          //    xhr.open("GET", "/"+streamName+"/chunk-stream"+streamId+"-"+chunkstr+".m4s");
          else
            xhr.open(
              "GET",
              ChunkURl + "chunk-stream" + streamId + "-" + chunkstr + ".m4s"
            );
          // xhr.open("GET", "/stream/"+streamName+"/"+streamId+"/"+chunkId);
          xhr.responseType = "arraybuffer";
          // xhr.setRequestHeader("SID", dheParams.SID);
          // if(useAES)
          //     xhr.setRequestHeader("AES", "1");
          activeRequests[chunkId] = true;
          xhr.send();
        }

        // Fetch chunk for given timestamp
        function fetchChunkTime(sourceBuffer, streamId, time, callback) {
          const chunkId = getStop(time);
          if (chunkId) fetchChunk(sourceBuffer, streamId, chunkId, callback);
        }

        const demand = [];
        let finished = true;

        var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
        if (!durationSet) {
          mediaSource.duration = duration;
          durationSet = true;
        }

        // This even is called when source buffer successfuly finished appending buffer
        sourceBuffer.addEventListener("updateend", function (ev) {
          finished = true;
          //console.log("Stream#"+streamId+": Buffer succesfuly added");
          if (demand.length > 0) {
            const chunk = demand.shift();
            finished = false;

            sourceBuffer.appendBuffer(chunk);
          }
        });

        // Make sure to also catch errors, if any occur
        sourceBuffer.addEventListener("error", function (ev) {
          console.log(ev);
          console.error(
            "Stream#" + streamId + ": Error occured during adding buffer"
          );
        });

        // As video keeps playing, we also want to pre-fetch upcoming chunks
        // so that player doesn't lag much
        video.addEventListener("timeupdate", (event) => {
          fetchChunkTime(sourceBuffer, streamId, video.currentTime);
          // We buffer bufferSteps * bufferStepSize seconds worth of content in forward
          for (let i = 0; i < bufferSteps; i++) {
            fetchChunkTime(
              sourceBuffer,
              streamId,
              video.currentTime + (i + 1) * bufferStepSize
            );
          }
        });

        // Fetch the very first two chunks
        fetchChunk(sourceBuffer, streamId, 0, () => {
          fetchChunk(sourceBuffer, streamId, 1);
        });
      }
      // Add all streams that were specified in manifest

      for (let streamId in manifest) {
        AddSource(streamId, manifest[streamId]);
        console.log(streamId);
      }
    });
    // Assign our media source object to virtual HTML5 video player
    // player = new Plyr(video, {
    //     controls: [
    //         'play-large', // The large play button in the center
    //         'restart', // Restart playback
    //         'rewind', // Rewind by the seek time (default 10 seconds)
    //         'play', // Play/pause playback
    //         'fast-forward', // Fast forward by the seek time (default 10 seconds)
    //         'progress', // The progress bar and scrubber for playback and buffering
    //         'current-time', // The current time of playback
    //         'duration', // The full duration of the media
    //         'mute', // Toggle mute
    //         'fullscreen' // Toggle fullscreen

    //     ],
    //     settings: ['captions', 'quality', 'speed'],
    //     quality: {
    //         default: 576,
    //         options: [432, 576, 720, 1080], // Add your desired quality options here
    //         forced: true, // Force the quality setting on the player
    //         onChange: (quality) => {
    //             console.log('Quality changed to', quality);
    //         },
    //     },
    //     speed: {
    //         selected: 1, // Default speed
    //         options: [0.5, 0.75, 1, 1.25, 1.5, 2], // Speed options
    //     }
    // });
    video.src = URL.createObjectURL(mediaSource);
  });
}

// Export our function, so it's publicly accessible from other JavaScript code out there
window.StreamVideo = StreamVideo;
