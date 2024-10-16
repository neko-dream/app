// import {
//   useLoaderData,
//   useOutletContext,
//   useRevalidator,
// } from "@remix-run/react";
// import { useCallback } from "react";
// import Button from "~/components/Button";
// import Card from "~/components/Card";
// import Heading from "~/components/Heading";
// import { OpinionStatus } from "~/feature/opinion/status";
// import { SessionRouteContext } from "~/feature/session/context";
// import { api } from "~/libs/api";
// import { useLoaderData } from "@remix-run/react";
import { Deck } from "./components/CardSwiper";
import "./index.css";
import { loader } from "./modules/loader";

export { ErrorBoundary } from "./modules/ErrorBoundary";
export { loader };

export default function Page() {
  // const { data } = useLoaderData<typeof loader>();

  return (
    <div className="container">
      <Deck />
    </div>
  );
}

// export default function Page() {
// const { session } = useOutletContext<SessionRouteContext>();
// const { data } = useLoaderData<typeof loader>();
// const revalidator = useRevalidator();
// const handleClick = useCallback(
//   async (v: OpinionStatus) => {
//     const { data: result } = await api.POST(
//       "/talksessions/{talkSessionID}/opinions/{opinionID}/votes",
//       {
//         credentials: "include",
//         params: {
//           path: {
//             talkSessionID: session.id,
//             opinionID: data.opinion.id,
//           },
//         },
//         body: {
//           voteStatus: v,
//         },
//       },
//     );
//     if (result) {
//       revalidator.revalidate();
//     }
//   },
//   [data.opinion.id, revalidator, session.id],
// );
// return (
//   <>
//     <Heading>みんなの意見、どう思う？</Heading>
//     <Deck />
//     <div className="m-4">
//       <Card
//         title={data.opinion.title || ""}
//         description={data.opinion.content}
//         user={{
//           displayID: data.user.displayID,
//           displayName: data.user.displayName,
//           photoURL: data.user.iconURL || "",
//         }}
//         opinionStatus="disagree"
//       />
//     </div>
//     <div className="mt-8 flex justify-around">
//       <Button
//         variation="disagree"
//         className="w-20"
//         onClick={() => handleClick("disagree")}
//       >
//         違うかも
//       </Button>
//       <Button
//         variation="pass"
//         className="w-20"
//         onClick={() => handleClick("pass")}
//       >
//         保留
//       </Button>
//       <Button
//         variation="agree"
//         className="w-20"
//         onClick={() => handleClick("agree")}
//       >
//         良さそう
//       </Button>
//     </div>
//   </>
// );
// }
