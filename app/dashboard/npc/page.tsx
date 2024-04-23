import { getNPCs } from "@/lib/firebase/firestore";
import NpcItem from "./components/npc-item/npc-item";
import { NpcModel } from "@/models/npc";

const NpcMainPage = async () => {
  const data = await getNPCs();

  data.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main>
      <section
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "unset",
          flexWrap: "wrap",
          gap: "40px",
          padding: "20px 64px",
        }}
      >
        {data.map(npc => (
          <NpcItem
            key={npc.id}
            npc={npc}
          />
        ))}
      </section>
    </main>
  );
};

export default NpcMainPage;
