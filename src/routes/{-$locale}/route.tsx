import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";

import { SiteChrome } from "@/components/site-chrome";
import { getMessages } from "@/i18n";
import { DEFAULT_LOCALE, isPrefixedLocale } from "@/i18n/locales";
import { MessagesProvider } from "@/i18n/messages-context";

/**
 * Every page lives under an optional language folder: /about is English, /sv/about is Swedish. This layout
 * checks the folder is a real language, loads that language's messages, makes them available to every
 * component below it, and wraps the page in the header and footer.
 */
export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    if (params.locale !== undefined && !isPrefixedLocale(params.locale)) throw notFound();
  },
  loader: async ({ params }) => {
    const locale = isPrefixedLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
    const messages = await getMessages(locale);
    return { locale, messages };
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();
  return (
    <MessagesProvider value={messages}>
      <SiteChrome locale={locale} chrome={messages.chrome}>
        <Outlet />
      </SiteChrome>
    </MessagesProvider>
  );
}
