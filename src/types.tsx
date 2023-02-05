import React, { ReactElement, ReactNode } from "react";
import { IconType } from "react-icons";
import { FlexProps, BoxProps } from "@chakra-ui/react";
import { FormikValues } from "formik";

export type SignInProps = {
  title: string,
  validateUsername: (value: string) => string | undefined,
  validatePassword: (value: string) => string | undefined,
  handleFormSubmit: (values: FormikValues, actions: FormikValues) => void
};

export type Bucket = {
  subdomain: string;
  owner: string;
  createdAt: string;
  events?: any
};

export type UserState = {
  user: string;
  signIn: (username: string, password: string) => Promise<void | Error>;
  signUp: (username: string, password: string) => Promise<void | Error>;
  signOut: () => Promise<void>;
}

export type Error = {
  error: string
}

export interface LinkItemProps {
  name: string;
  icon: IconType;
}

export interface NavLinkProps {
  children: React.ReactNode;
  link: string;
}

export interface NavItemProps extends FlexProps {
  icon: IconType;
}

export interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

export interface BrandButtonProps {
  children: ReactNode;
  type: "primary" | "secondary";
  onClick: () => void;
}
