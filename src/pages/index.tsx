import { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { fetcher } from '../fetcher';
import Image from 'next/image';
import RootLayout from './layout';
import styled from 'styled-components';

type HeaderProps = { title: string };
function Header({ title }: HeaderProps) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

export default function HomePage() {
  const { data, error } = useSWR('/api/foo', fetcher<{ name: string }>);
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState<string>();

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('File', file);

    fetch('/api/convert', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
        setImage(`/${result.uuid}/${result.filename}`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <RootLayout>
      <StyledHeader>{data.name}</StyledHeader>
      <input type="file" name="file" onChange={changeHandler} />
      <div>{file && `${file.name} - ${file.type}`}</div>
      <button onClick={handleUploadClick}>Upload</button>
      <div>
        {image && (
          <Image src={image} alt="converted image" width={100} height={100} />
        )}
        {image && (
          <Link href={image} target="_blank">
            {image}
          </Link>
        )}
      </div>
    </RootLayout>
  );
}

const StyledHeader = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
