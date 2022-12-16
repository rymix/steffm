import Clock from "components/system/Taskbar/Clock";
import StyledTaskbar from "components/system/Taskbar/StyledTaskbar";
import TaskbarEntries from "components/system/Taskbar/TaskbarEntries";
import useTaskbarContextMenu from "components/system/Taskbar/useTaskbarContextMenu";
import { FOCUSABLE_ELEMENT } from "utils/constants";

const Taskbar: FC = () => {
  return (
    <StyledTaskbar {...useTaskbarContextMenu()} {...FOCUSABLE_ELEMENT}>
      <TaskbarEntries />
      <Clock />
    </StyledTaskbar>
  );
};

export default Taskbar;
