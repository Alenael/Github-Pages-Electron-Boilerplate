import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

interface IProps {
  day: dayjs.Dayjs;
  recentReleases: any;
  isMobile: boolean;
}

export default function Day({ day, recentReleases, isMobile }: IProps) {
  const releases = getReleases();
  const screenshots = getScreenshots(releases);

  const [index, setIndex] = useState(0);

  const [pauseTransition, setPauseTransition] = useState(false);

  useEffect(() => {
    if (screenshots != null && screenshots.length > 0) {
      const interval = setInterval(() => {
        if (pauseTransition == false) {
          setIndex(index === screenshots.length - 1 || screenshots.length == 0 ? 0 : index + 1);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenshots]);

  function getCurrentDayClass(): string {
    if (day.isBefore(dayjs(), "day")) return "bg-slate-600 rounded-full w-6";

    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-amber-600 rounded-full w-6"
      : "bg-slate-700 rounded-full w-6";
  }

  function getReleases(): string[] {
    if (recentReleases == null) {
      return [];
    }

    const games: string[] = [];
    const gameIdx: string[] = [];
    Object.keys(recentReleases).forEach((value, idx) => {
      const id = recentReleases[idx]["game"]["name"];
      if (games.indexOf(id) == -1) {
        games.push(id);
        gameIdx.push(idx.toString());
      }
    });

    return Object.values(gameIdx).filter((key) => recentReleases[key]["human"] == day.format("MMM DD, YYYY"));
  }

  function getScreenshots(releases: string[]): { url: string; name: string }[] {
    if (releases.length == 0) return [];

    const urls: { url: string; name: string }[] = [];

    releases.forEach((release) => {
      const game = recentReleases[release]["game"];
      const screenshots = game["screenshots"];

      screenshots &&
        urls.push({
          url: `//images.igdb.com/igdb/image/upload/t_cover_big/${screenshots[0]["image_id"]}.jpg`,
          name: game["name"],
        });
    });

    return urls;
  }

  function getActiveStatus(idx: number): string {
    if (index == idx) return "z-10 opacity-100";
    return "opacity-0";
  }

  function getScaleStatus(): string {
    if (screenshots.length > 0 && isMobile == false) return "hover:scale-150";
    return "";
  }

  return isMobile ? (
    <React.Fragment>
      <div
        className={`flex flex-col flex-1 mx-1 my-1 hover:z-10 ${getScaleStatus()} text-white text-s h-36 bg-white/30 backdrop-blur-sm`}
        onMouseEnter={() => setPauseTransition(true)}
        onMouseLeave={() => setPauseTransition(false)}
      >
        <div className="realative">
          {screenshots.map((screenshot, idx) => {
            return (
              <React.Fragment key={idx}>
                <img
                  className={`absolute w-full h-full transition-opacity duration-500 ease-out ${getActiveStatus(idx)}`}
                  src={screenshot?.url || ""}
                ></img>
              </React.Fragment>
            );
          })}
        </div>
        <span className={`absolute z-30 ${getCurrentDayClass()}`}>{day.format("DD")}</span>
        {screenshots.length > 0 && (
          <div className="flex-1 opacity-100 z-20 truncate">
            <header>
              <div className="bg-black/40 text-left">
                <span className="ml-6">{screenshots[index]?.name || ""}</span>
              </div>
            </header>
          </div>
        )}
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div
        className={`flex flex-col mx-1 my-1 hover:z-10 ${getScaleStatus()} text-white text-s h-36 bg-white/30 backdrop-blur-sm`}
        onMouseEnter={() => setPauseTransition(true)}
        onMouseLeave={() => setPauseTransition(false)}
      >
        <div className="realative">
          {screenshots.map((screenshot, idx) => {
            return (
              <React.Fragment key={idx}>
                <img
                  className={`absolute w-full h-full transition-opacity duration-500 ease-out ${getActiveStatus(idx)}`}
                  src={screenshot?.url || ""}
                ></img>
              </React.Fragment>
            );
          })}
        </div>
        <span className={`absolute z-30 ${getCurrentDayClass()}`}>{day.format("DD")}</span>
        {screenshots.length > 0 && (
          <div className={"flex-1 opacity-0 hover:opacity-100 z-20 truncate"}>
            <header>
              <div className="bg-black/40 text-left">
                <span className="ml-6">{screenshots[index]?.name || ""}</span>
              </div>
            </header>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
