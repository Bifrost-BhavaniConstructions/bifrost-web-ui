import React from "react";
import "./Login.css";
import { loginUserWithUsernamePassword } from "@/adapters/AuthAdapter";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  // Objects

  const formSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  // Variables

  // State Variables - Hooks
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  // Functions

  // Hook Functions
  const navigate = useNavigate();

  const submitData = async (values: z.infer<typeof formSchema>) => {
    const token = await loginUserWithUsernamePassword(
      values.username,
      values.password,
    );
    if (token) {
      navigate(`/login-redirect?token=${token}`);
    }
  };

  return (
    <div className="w-[100%] h-[100%] bg-background flex justify-center items-center">
      <div className="flex flex-col">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitData)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
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
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} type={"password"} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
