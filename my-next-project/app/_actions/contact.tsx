"use server";

function validateEmail(email: string) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

export async function createContactData(_prevState: any, formData: FormData) {
  const rawFormData = {
    lastname: formData.get("lastname") as string,
    firstname: formData.get("firstname") as string,
    company: formData.get("company") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  if (!rawFormData.lastname) {
    return {
      status: "error",
      message: "姓を入力して下さい",
    };
  }

  if (!rawFormData.firstname) {
    return {
      status: "error",
      message: "名を入力して下さい",
    };
  }
  if (!rawFormData.company) {
    return {
      status: "error",
      message: "名を入力して下さい",
    };
  }
  if (!rawFormData.email) {
    return {
      status: "error",
      message: "メールアドレスを入力して下さい",
    };
  }
  if (!validateEmail(rawFormData.email)) {
    return {
      status: "error",
      message: "メールアドレスの形式が間違っています。",
    };
  }
  if (!rawFormData.message) {
    return {
      status: "error",
      message: "メッセージを入力して下さい",
    };
  }

  return { status: "success", message: "OK" };
}
