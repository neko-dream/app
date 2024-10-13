type Props = {
  children?: React.ReactNode;
};

export default function Error({ children }: Props): JSX.Element {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      {children ? (
        children
      ) : (
        <>
          <p>あちゃ〜〜</p>
          <p>なんかエラーがでちゃ〜〜</p>
        </>
      )}
    </div>
  );
}
