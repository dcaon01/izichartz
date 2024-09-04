import ContextMenu from "@/components/modules/general/ui-elements/ContextMenu/ContextMenu";
import ContextMenuOption from "@/components/modules/general/ui-elements/ContextMenu/ContextMenuOption";

export default function ERContextMenu({ posX, posY }) {
    return (
        <ContextMenu posX={posX} posY={posY}>
            <ContextMenuOption text="Entity" img="/assets/design/add.png" />
            <ContextMenuOption text="Relationship" img="/assets/design/add.png" />
        </ContextMenu>
    );
}

