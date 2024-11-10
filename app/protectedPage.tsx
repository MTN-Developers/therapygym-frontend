// pages/protectedPage.tsx
import { GetServerSideProps } from "next";
import nookies from "nookies";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  if (!cookies.accessToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Optionally validate the accessToken here

  return {
    props: {}, // Pass props to the page component
  };
};

const ProtectedPage = () => {
  return <div>Protected Content</div>;
};

export default ProtectedPage;
