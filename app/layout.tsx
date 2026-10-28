import { Geist, Geist_Mono, Inter, Lora } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/toast"

const loraHeading = Lora({ subsets: ["latin"], variable: "--font-heading" })

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        loraHeading.variable
      )}
    >
      <ClerkProvider
        appearance={{
          options: {
            socialButtonsVariant: "iconButton",
          },

          variables: {
            colorPrimary: "#193cb8",
            colorBackground: "#161b1d",
            colorInput: "#27272a",
          },
        }}
      >
        <body>
          <ThemeProvider>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  )
}
