-- Fix the security issue: referrals table should only be viewable by admins
-- Drop the existing overly permissive SELECT policy
DROP POLICY IF EXISTS "Users can view referrals they submitted" ON public.referrals;

-- Create a new policy that only allows admins to view referrals
CREATE POLICY "Admins can view all referrals"
ON public.referrals
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));