"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, Pulse, Line, Row, ToggleButton } from "@once-ui-system/core";

import { routes, display, person, about, blog, work, gallery } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";
  const [workVisited, setWorkVisited] = useState(false);

  // Track if work page has been visited in this session
  useEffect(() => {
    if (pathname.startsWith("/work")) {
      setWorkVisited(true);
      // Store in sessionStorage to persist across navigation
      typeof window !== "undefined" && sessionStorage.setItem("workVisited", "true");
    }
  }, [pathname]);

  // Check sessionStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const visited = sessionStorage.getItem("workVisited");
      if (visited) {
        setWorkVisited(true);
      }
    }
  }, []);

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{
          position: "fixed",
        }}
      >
        <Row paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && <Row s={{ hide: true }}>{person.location}</Row>}
        </Row>
        <Row fillWidth horizontal="center">
          <Row
            background="page"
            style={{ border: "2px solid #20a801" }}
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row gap="12" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
              )}
              {routes["/about"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="person"
                      href="/about"
                      label={about.label}
                      selected={pathname === "/about"}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      size="l"
                      prefixIcon="person"
                      href="/about"
                      selected={pathname === "/about"}
                    />
                  </Row>
                </>
              )}
              {routes["/work"] && (
                <>
                  <Row s={{ hide: true }}>
                    <div className={styles.workIconWrapper}>
                      <ToggleButton
                        prefixIcon="grid"
                        href="/work"
                        label={work.label}
                        selected={pathname.startsWith("/work")}
                      />
                      {!workVisited && (
                        <div className={styles.pulseIndicator}>
                          <Pulse size="m" variant="danger" />
                        </div>
                      )}
                    </div>
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <div className={styles.workIconWrapper}>
                      <ToggleButton
                        size="l"
                        prefixIcon="grid"
                        href="/work"
                        selected={pathname.startsWith("/work")}
                      />
                      {!workVisited && (
                        <div className={styles.pulseIndicator}>
                          <Pulse size="m" variant="danger" />
                        </div>
                      )}
                    </div>
                  </Row>
                </>
              )}

              {/* {routes["/blog"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="book"
                      href="/blog"
                      label={blog.label}
                      selected={pathname.startsWith("/blog")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="book"
                      href="/blog"
                      selected={pathname.startsWith("/blog")}
                    />
                  </Row>
                </>
              )} */}
              {routes["/gallery"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="gallery"
                      href="/gallery"
                      label={gallery.label}
                      selected={pathname.startsWith("/gallery")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      size="l"
                      prefixIcon="gallery"
                      href="/gallery"
                      selected={pathname.startsWith("/gallery")}
                    />
                  </Row>
                </>
              )}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <Row s={{ hide: true }}>
                    <ThemeToggle size="s" />  {/* Desktop: small */}
                  </Row>

                  <Row hide s={{ hide: false }}>
                    <ThemeToggle size="l" />  {/* Mobile: large */}
                  </Row>
                </>
              )}
            </Row>
          </Row>
        </Row>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex s={{ hide: true }}>
              {display.time && <TimeDisplay timeZone={person.location} />}
            </Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
