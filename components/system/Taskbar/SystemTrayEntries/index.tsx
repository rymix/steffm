import StyledSystemTrayControls from "components/apps/Mixcloud/SystemTrayControls/StyledSystemTrayControls";
import StyledSystemTrayEntries from "components/system/Taskbar/SystemTrayEntries/StyledSystemTrayEntries";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const SystemTrayEntry = dynamic(
  () => import("components/system/Taskbar/SystemTrayEntry")
);

const SystemTrayEntries: FC = () => {
  return (
    <StyledSystemTrayEntries>
      <AnimatePresence initial={false} presenceAffectsLayout={false}>
        <SystemTrayEntry />
        <StyledSystemTrayControls />
      </AnimatePresence>
    </StyledSystemTrayEntries>
  );
};

export default SystemTrayEntries;
