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
      className="flex space-x-4 px-4 border border-gray-700 max-w-80"
    >
      <img src={GoogleIcon} className="w-6 h-6 inset-0 left-6" alt="" />
      <p className="text-center">Googleでログイン</p>
    </Button>
  );
}

export default forwardRef(GoogleLoginButton);
