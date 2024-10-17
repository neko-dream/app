import { useEffect } from "react";
import Button from "~/components/Button";
import Heading from "~/components/Heading";
import CardSwiper from "./components/CardSwiper";
import { useSwipe } from "./hooks/useSwipe";
import { loader } from "./modules/loader";

export { ErrorBoundary } from "./modules/ErrorBoundary";
export { loader };

export default function Page() {
  // const { data } = useLoaderData<typeof loader>();
  const swipe = useSwipe();

  const handleClose = () => {
    swipe.api.start((i) => {
      const current = 2 - swipe.gone.size;
      if (i !== current) return;

      return {
        y: i * 6,
        x: 0,
        config: {
          friction: 50,
          tension: 200,
        },
      };
    });
  };

  const handleClick = (v: string) => {
    swipe.api.start((i) => {
      const current = 2 - swipe.gone.size;
      if (i !== current) return;
      swipe.gone.add(current);

      return {
        x: v === "agree" ? 800 : v == "disagree" ? -800 : 0,
        y: v === "pass" ? 800 : 0,
        scale: 1,
        config: { friction: 50, tension: 200 },
      };
    });
  };

  return (
    <div className="w-full h-full relative z-30">
      <Heading className="mb-4">みんなの意見、どう思う？</Heading>
      <CardSwiper {...swipe} />
      <div className="flex w-full justify-between px-4 space-x-2 absolute bottom-8">
        <Button variation="disagree" onClick={() => handleClick("disagree")}>
          違うかも
        </Button>
        <Button variation="pass" onClick={() => handleClick("pass")}>
          保留
        </Button>
        <Button variation="agree" onClick={() => handleClick("agree")}>
          良さそう
        </Button>
      </div>
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
