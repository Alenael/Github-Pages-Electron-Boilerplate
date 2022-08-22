import dayjs from "dayjs";
import React from "react";

interface IProps {
  day: dayjs.Dayjs;
  recentReleases: any;
}

export default function Day({ day, recentReleases }: IProps) {
  function getCurrentDayClass(): string {
    if (day.isBefore(dayjs(), "day")) return "bg-slate-600 text-white rounded-full w-7";

    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-amber-600 text-white rounded-full w-7"
      : "bg-slate-700 text-white rounded-full w-7";
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

  return (
    <React.Fragment>
      <div className="backdrop-blur-sm bg-white bg-opacity-20 rounded-md drop-shadow-sm mx-1 my-1 flex flex-col">
        <header className="flex flex-col items-left">
          <p className={`text-sm p-1 my-1 mx-1 text-center ${getCurrentDayClass()}`}>{day.format("DD")}</p>
        </header>

        <div className="text-xs">
          {getReleases()
            .slice(0, 7)
            .map((release) => {
              return (
                <div key={release}>
                  {recentReleases[release]["game"]["name"]} ({recentReleases[release]["platform"]})
                </div>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
}
