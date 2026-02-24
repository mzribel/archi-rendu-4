import { Module } from "@nestjs/common";
import { SupabaseAuth } from "./supabase/supabase.auth";
import { ICredentialAuthProvider } from '@modules/auth/interfaces/i.credential.auth.provider';

@Module({
  providers: [{
    provide: ICredentialAuthProvider, useClass: SupabaseAuth
  }],
  exports: [ICredentialAuthProvider],
})
export class AuthProvidersModule {}