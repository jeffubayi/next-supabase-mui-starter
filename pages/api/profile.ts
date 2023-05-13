/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utility/supabaseClient";
import {  useUser } from '@supabase/auth-helpers-react'

type Profile = {
  username: string;
  website: string;
  avatar_url: string;
  message?: string;
  company: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const user  = useUser();
  try {
    // Fetch flight data from the OpenSky API
    let { data, error, status } = await supabase
      .from("profiles")
      .select(`username, website, avatar_url,company`)
      .eq("id", user?.id)
      .single();
    // Return the flight data to the client
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching flight data." });
  }
};
