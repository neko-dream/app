import { Link, useLoaderData, useParams } from "@remix-run/react";
import { toast } from "react-toastify";
import Button, { button } from "~/components/Button";
import Heading from "~/components/Heading";
import { OpinionStatus } from "~/feature/opinion/status";
import { api } from "~/libs/api";
import CardSwiper from "./components/CardSwiper";
import { OpinionModal } from "./components/OpinonModal";
import { useSwipe } from "./hooks/useSwipe";
import { animations } from "./libs/animations";
import { loader } from "./modules/loader";

export { ErrorBoundary } from "./modules/ErrorBoundary";
export { loader };

export default function Page() {
  const params = useParams();
  const { data: opinions } = useLoaderData<typeof loader>();
  const swipe = useSwipe({ cards: opinions });

  if (!opinions.length) {
    return (
      <>
        <Heading className="mb-4">みんなの意見、どう思う？</Heading>
        <div className="flex-1 flex flex-col justify-center items-center">
          <p>全ての意見に意思表明しました🎉</p>
          <Link
            to={`/${params.id}/opinion`}
            className={button({ color: "primary", className: "mt-8" })}
          >
            みんなの意見を見る
          </Link>
        </div>
      </>
    );
  }

  const handleClose = (v: OpinionStatus | null) => {
    swipe.api.resume();
    swipe.state.setIsOpnionModalOpen(false);
    swipe.api.start((i) => {
      const current = opinions.length - swipe.gone.size - 1;
      if (i !== current) return;

      return {
        ...animations.init(),
        y: i * 6,
        onStart: () => {
          if (v) {
            handleSubmitVote(v);
          }
        },
      };
    });
  };

  const handleSubmitVote = async (v: OpinionStatus) => {
    const { error } = await api.POST(
      "/talksessions/{talkSessionID}/opinions/{opinionID}/votes",
      {
        credentials: "include",
        params: {
          path: {
            talkSessionID: params.id!,
            opinionID:
              opinions[opinions.length - swipe.gone.size - 1].opinion.id,
          },
        },
        body: {
          voteStatus: v,
        },
      },
    );

    if (error) {
      return toast.error(error.message);
    }

    swipe.api.start((i) => {
      const current = opinions.length - swipe.gone.size - 1;
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
    <>
      <div className="w-full h-full relative z-30">
        <Heading className="mb-4">みんなの意見、どう思う？</Heading>
        <CardSwiper {...swipe} itemLength={opinions.length} />
        <div className="flex w-full justify-between px-4 space-x-2 absolute bottom-8">
          <Button
            variation="disagree"
            onClick={() => handleSubmitVote("disagree")}
          >
            違うかも
          </Button>
          <Button variation="pass" onClick={() => handleSubmitVote("pass")}>
            保留
          </Button>
          <Button variation="agree" onClick={() => handleSubmitVote("agree")}>
            良さそう
          </Button>
        </div>
        <OpinionModal
          open={swipe.state.isOpinionModalOpen}
          onOpenChange={handleClose}
        />
      </div>
    </>
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
