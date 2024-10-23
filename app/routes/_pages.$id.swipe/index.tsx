import {
  Link,
  useLoaderData,
  useParams,
  useRevalidator,
} from "@remix-run/react";
import { useEffect, useState } from "react";
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
  const { data: opinions } = useLoaderData<typeof loader>();
  const [isOpinionEnd, setIsOpinionEnd] = useState<boolean>(false);
  const params = useParams();
  const swipe = useSwipe({
    opinions,
    onSwipe: async ({ opinionID, opinionStatus }) => {
      const { error } = await api.POST(
        "/talksessions/{talkSessionID}/opinions/{opinionID}/votes",
        {
          credentials: "include",
          params: {
            path: {
              talkSessionID: params.id!,
              opinionID: opinionID,
            },
          },
          body: {
            voteStatus: opinionStatus,
          },
        },
      );

      if (error) {
        return toast.error(error.message);
      }

      const current = opinions.length - swipe.gone.size;
      setTimeout(() => {
        if (current === 0) setIsOpinionEnd(true);
      }, 300);
    },
  });

  const revalidate = useRevalidator();

  useEffect(() => {
    if (!opinions.length) {
      setIsOpinionEnd(true);
    }
  }, [opinions]);

  if (!opinions.length) {
    return (
      <div className="w-full h-full relative">
        <Heading className="mb-4">みんなの意見、どう思う？</Heading>
        <div className="flex flex-col justify-center items-center h-full space-y-4 -mt-40">
          <p>全ての意見に意思表明しました🎉</p>
          <Link
            to={`/${params.id}/opinion`}
            className={button({ color: "primary" })}
          >
            みんなの意見を見る
          </Link>
        </div>
      </div>
    );
  }

  const handleClose = (v: OpinionStatus | null) => {
    swipe.api.resume();
    swipe.state.setIsOpnionModalOpen(false);
    // MEMO: 元の位置に戻す
    swipe.api.start((i) => {
      const current = opinions.length - swipe.gone.size - 1;
      if (i !== current) return;

      return {
        ...animations.init(),
        y: i * 6,
        onStart: () => {
          // MEMO: 意思表明をしていた場合はスワイプさせる
          if (v) {
            handleSubmitVote(v);
          }
        },
      };
    });
  };

  const handleSubmitVote = async (v: OpinionStatus) => {
    const current = opinions.length - swipe.gone.size - 1;
    // MEMO: すべてのカードをスワイプした場合は何もしない
    if (current < 0) {
      return;
    }

    // MEMO: いますワイプしているカードのIDを取得
    const opinionID =
      opinions[opinions.length - swipe.gone.size - 1].opinion.id;

    const { error } = await api.POST(
      "/talksessions/{talkSessionID}/opinions/{opinionID}/votes",
      {
        credentials: "include",
        params: {
          path: {
            talkSessionID: params.id!,
            opinionID: opinionID,
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

    setTimeout(() => {
      if (current === 0) setIsOpinionEnd(true);
    }, 300);

    swipe.api.start((i) => {
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

  const handleRevalidate = () => {
    setIsOpinionEnd(false);
    revalidate.revalidate();
    swipe.gone.clear();
    swipe.api.start((i) => ({
      ...animations.to(),
      y: i * 6,
      delay: i * 50,
      from: animations.from(),
    }));
  };

  if (isOpinionEnd) {
    return (
      <div className="w-full h-full relative">
        <Heading className="mb-4">みんなの意見、どう思う？</Heading>
        <div className="flex flex-col justify-center items-center h-full space-y-4 -mt-40">
          <p>３件の意見に意思表明しました🎉</p>
          <Button variation="primary" onClick={handleRevalidate}>
            さらに意思表明する
          </Button>
          <Link
            to={`/${params.id}/opinion`}
            className={button({ color: "primary" })}
          >
            みんなの意見を見る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <Heading className="mb-4">みんなの意見、どう思う？</Heading>
      <CardSwiper {...swipe} />
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
  );
}
