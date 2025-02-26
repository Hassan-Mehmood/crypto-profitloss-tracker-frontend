import { cookies } from "next/headers";
import { serverApi } from "../axios";

export default async function PortfolioPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("userCookie")?.value;

  console.log(sessionCookie ? sessionCookie : "false");

  if (!sessionCookie) {
    return (
      <div>
        <p>You are not logged in</p>
      </div>
    );
  }

  // const { data, status } = await serverApi.get("/users/protected", {
  //   headers: {
  //     cookie: `connect.sid=${sessionCookie}`,
  //   },
  // });

  return <div>Portfolio</div>;
}
