import * as React from 'react';
import { useRouter } from "next/router";
import { useSession,useSupabaseClient } from '@supabase/auth-helpers-react'


export default function About() {
    const supabaseClient = useSupabaseClient()
    const session = useSession()
    return (
        <React.Fragment>
         
        </React.Fragment>
    );
}
