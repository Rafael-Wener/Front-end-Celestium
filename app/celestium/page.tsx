
import LoginReminderCelestium from "./LoginReminder";
import DiscordReminderCelestium from "./DiscordReminder";
import NavbarCelestium from "./Navbar";
import HeaderCelestium from "./Header";
import GameModesCelestium from "./Gamemode";
import FooterCeslestium from "./Footer";

export default function CelestiumPage() {
  return (
    <div className="flex flex-col items-center justify-center font-sans">      
      <NavbarCelestium />
      <HeaderCelestium />
      <LoginReminderCelestium />
      <GameModesCelestium />
      <DiscordReminderCelestium />
      <FooterCeslestium />
    </div>
  );
}
