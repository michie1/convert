import useSWR from 'swr';

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

type HeaderProps = { title: string };
function Header({ title }: HeaderProps) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

export default function HomePage() {
  const { data, error } = useSWR('/api/convert', fetcher<{ name: string }>);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <div>
      Hello
      <Header title={data.name} />
    </div>
  );
}
