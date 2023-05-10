/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });

  try {
    const {
      data: { user },
    } = await supabaseServerClient.auth.getUser();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching user" });
  }
};
