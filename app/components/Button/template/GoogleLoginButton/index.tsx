import { ComponentProps, ForwardedRef, forwardRef } from "react";
import GoogleIcon from "~/assets/auth/Google.png";
import Button from "../..";

function GoogleLoginButton(
  props: ComponentProps<"button">,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <Button
      {...props}
      ref={ref}
      outline
      className="border border-gray-700 max-w-80"
    >
      <span className="flex font-normal relative justify-center box-content">
        <img src={GoogleIcon} className="w-6 h-6 absolute inset-0 left-6" />
        <p className="text-center">Googleでログイン</p>
      </span>
    </Button>
  );
}

export default forwardRef(GoogleLoginButton);
