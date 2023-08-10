import { supabase } from "$lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

export class UserService {
  static async hasProfile(user: User) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user", user.id)
      .single();

    if (error) {
      return false;
    }

    return !!data;
  }

  static async getProfile(user: User) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user", user.id)
      .single();

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  }
}