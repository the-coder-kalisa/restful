import IconInput from "@/components/ui/icon-input";
import { MdMail } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RiLock2Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { FaChevronRight } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { instance } from "@/lib/axios";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,}$/,
      "Password must contain at least 8 characters, including letters and numbers"
    ),
});

const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    toast.promise(instance.post("/users/login", values), {
      loading: "Loading...",
      success: (data) => {
        localStorage.setItem("token", data.data.token);
        window.location.href = "/";
        return "Login successful";
      },
      error: (error) => {
        return error.response?.data?.error ?? "Error logging in";
      },
    });
  };
  return (
    <>
      <div className="text-[#2F3367] font-bold text-[28px]">Login</div>
      <div className="font-medium text-[16px] text-[#303468] ">
        Please fill your information below
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="lg:mt-10 mt-6 space-y-7"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <IconInput Icon={MdMail} placeholder="E-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <IconInput
                    Icon={RiLock2Line}
                    placeholder="Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" className="bg-[#4880FF] gap-2 items-center">
              <span>Login</span>
              <FaChevronRight />
            </Button>
          </div>
          <Separator />
          <div className="flex sm:flex-row flex-col justify-between">
            <div className="text-[#393D6E] text-[16px] font-medium">
              Don't have account?
            </div>
            <Link
              to="/register"
              className="text-[#007DFA] font-semibold text-[16px]"
            >
              Register acount
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Login;
