import React from "react";

const page = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  console.log(id);
  return <div>Payment Page</div>;
};

export default page;
