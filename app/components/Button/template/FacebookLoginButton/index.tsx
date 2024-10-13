import { ComponentProps, ForwardedRef, forwardRef } from "react";
import FacebookIcon from "~/assets/auth/Facebook.png";
import Button from "../..";

function FacebookLoginButton(
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
        <img
          src={FacebookIcon}
          className="w-6 h-6 absolute inset-0 left-6"
          alt=""
        />
        <p className="text-center">Facebookでログイン</p>
      </span>
    </Button>
  );
}

export default forwardRef(FacebookLoginButton);
