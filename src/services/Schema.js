import * as Yup from "yup";
export const Schema = Yup.object().shape({
  firstName: Yup.string().required("* Tài khoản không để trống"),
  lastName: Yup.string().required("* Họ tên không để trống"),

  email: Yup.string()
    .email("* Email không hợp lệ")
    .required("* Email không được bỏ trống"),
  password: Yup.string().required("Mật khẩu không được bỏ trống"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("* Email không hợp lệ")
    .required("* Email không được bỏ trống"),
  password: Yup.string().required("* Mật khẩu không được bỏ trống"),
});
