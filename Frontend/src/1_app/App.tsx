import { memo, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";

import { conversationActions } from "@/3_widgets/Conversation/model/slice/ConversationSlice";
import { Navbar } from "@/3_widgets/Navbar";
import { Sidebar } from "@/3_widgets/Sidebar";

import { getUserInited, initAuthData } from "@/5_entities/User";

import socket from "@/6_shared/api/socket";
import { MainLayout, AppLoaderLayout } from "@/6_shared/layouts";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";

import { useAppToolbar } from "./lib/useAppToolbar";
import { AppRouter } from "./providers/router";
import { useTheme } from "./providers/ThemeProvider";
import { withTheme } from "./providers/ThemeProvider/ui/withTheme";

const App = memo(() => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);
  const toolbar = useAppToolbar();

  useEffect(() => {
    socket.on("message:received", (messageData) => {
      dispatch(conversationActions.addMessage(messageData));
    });

    return () => {
      // TODO
      socket.off("message:received", () => {});
    };
  }, [dispatch]);

  useEffect(() => {
    if (!inited) {
      dispatch(initAuthData());
    }
  }, [dispatch, inited]);

  if (!inited) {
    return (
      <div
        id="app"
        className={classNames("app", {}, [theme])}
      >
        <AppLoaderLayout />
      </div>
    );
  }

  return (
    <div id="app" className={classNames("app", {}, [theme])}>
      <Suspense fallback="">
        <MainLayout
          header={<Navbar />}
          content={<AppRouter />}
          sidebar={<Sidebar />}
          toolbar={toolbar}
        />
      </Suspense>
    </div>
  );
});

export default withTheme(App);
