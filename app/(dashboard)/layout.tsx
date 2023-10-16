'use client';
import '@mantine/core/styles.css';
import { Navbar } from "../../components/ui/Navbar";
import { MantineProvider, createTheme, ColorSchemeScript } from '@mantine/core';
import { useRouter } from 'next/navigation'

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My awesome app</title>

        <ColorSchemeScript />
      </head>
      <MantineProvider theme = {theme}><Navbar/>
            {children}
      </MantineProvider>
    </html>
  )
}

