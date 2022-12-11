import StyledMixesAndTracksSearchBox from "components/apps/Mixcloud/MixesAndTracksSearchBox/StyledMixesAndTracksSearchBox";
import type { Mix } from "components/apps/Mixcloud/types";
import { useMixcloud } from "contexts/mixcloud";
import { useRef } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { bulletItem } from "utils/functions";

const MixesAndTracksSearchBox = (): JSX.Element => {
  const { mixes, setMixcloudKey } = useMixcloud();
  const resultsBoxRef = useRef<HTMLDivElement>(null);
  const resultsBoxWidth = resultsBoxRef?.current?.getBoundingClientRect().width;

  const handleOnSelect = (item: Mix): void => {
    setMixcloudKey(item.mixcloudKey);
  };

  const formatResult = (item: Mix): JSX.Element => {
    return (
      <div
        className="results-item"
        style={{ display: "block", textAlign: "left" }}
      >
        {item.shortName}
        <ul className="track-list">
          {item.tracks.map(({ sectionNumber, trackName }, index) => (
            <li className="track-list-item" key={sectionNumber}>
              {index > 0 ? bulletItem(trackName) : trackName}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const autocompleteStyling = {
    backgroundColor: "white",
    border: "1px solid #cccccc",
    borderRadius: "5px",
    boxShadow: "unset",
    clearIconMargin: "3px 14px 0 0",
    color: "#212121",
    fontFamily: "Arial",
    fontSize: "13px",
    height: "38px",
    hoverBackgroundColor: "#eee",
    iconColor: "grey",
    lineColor: "rgb(232, 234, 237)",
    placeholderColor: "grey",
    searchIconMargin: "0 0 0 16px",
  };

  const fuseOptions = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    includeMatches: true,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["name", "tracks.trackName", "notes"],
  };

  return (
    <StyledMixesAndTracksSearchBox
      ref={resultsBoxRef}
      resultsBoxWidth={resultsBoxWidth}
    >
      <ReactSearchAutocomplete<Mix>
        autoFocus
        formatResult={formatResult}
        fuseOptions={fuseOptions}
        items={mixes}
        maxResults={10}
        onSelect={handleOnSelect}
        placeholder="Search"
        styling={autocompleteStyling}
      />
    </StyledMixesAndTracksSearchBox>
  );
};

export default MixesAndTracksSearchBox;
