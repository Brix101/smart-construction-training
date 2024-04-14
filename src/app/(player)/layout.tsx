interface LobbyLayoutProps extends React.PropsWithChildren<{}> {}

export default async function LobbyLayout({ children }: LobbyLayoutProps) {
  return <main className="flex flex-1">{children}</main>
}
