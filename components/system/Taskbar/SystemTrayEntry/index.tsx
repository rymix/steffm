import SystemTrayControls from "components/apps/Mixcloud/SystemTrayControls";
import StyledSystemTrayEntry from "components/system/Taskbar/SystemTrayEntry/StyledSystemTrayEntry";
import type { FC } from "react";

const SystemTrayEntry: FC = () => {
  return (
    <StyledSystemTrayEntry>
      <SystemTrayControls />
    </StyledSystemTrayEntry>
  );
};

export default SystemTrayEntry;
