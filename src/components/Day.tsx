import dayjs from "dayjs";
import React from "react";

interface IProps {
  day: dayjs.Dayjs;
  recentReleases: any;
}

export default function Day({ day, recentReleases }: IProps) {
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
      const screenshots = recentReleases[release]["game"]["screenshots"];
      const image = screenshots?.length > 0 ? screenshots[0]["image_id"] : "";
      if (image != "")
        urls.push({
          url: `//images.igdb.com/igdb/image/upload/t_cover_big/${image}.jpg`,
          name: recentReleases[release]["game"]["name"],
        });
    });

    return urls;
  }

  const releases = getReleases();
  const screenshots = getScreenshots(releases);
  return (
    <React.Fragment>
      <div
        className="flex flex-col mx-1 my-1 bg-cover text-white text-l h-36 bg-white/30 backdrop-blur-sm"
        style={{ backgroundImage: `url(${screenshots[0]?.url || ""})` }}
      >
        <span className={`absolute ${getCurrentDayClass()}`}>{day.format("DD")}</span>
        <div className="flex-1 opacity-0 hover:opacity-100 truncate">
          <header>
            <div className="bg-black/40 text-left">
              <span className="ml-6">{screenshots[0]?.name || ""}</span>
            </div>
          </header>
        </div>
        {/* p-1 my-1 mx-1 */}
        {/* <div className="text-xs">
          {getReleases()
            .slice(0, 7)
            .map((release) => {
              return (
                <div key={release} className={`text-white`}>
                  {recentReleases[release]["game"]["name"]} ({recentReleases[release]["platform"]})
                </div>
              );
            })}
        </div> */}
      </div>
    </React.Fragment>
  );
}
