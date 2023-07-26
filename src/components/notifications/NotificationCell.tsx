import { useMemo } from "react";
import { type FeedItem, type ContentBlock } from "@knocklabs/client/dist/types/clients/feed/interfaces";
import { Recipient } from "@knocklabs/node";

type Props = {
    item: FeedItem,
};
export declare type GenericData = {
    [x: string]: unknown;
};

interface User extends GenericData {
    id: string;
    email: string | null;
    name: string | null;
    phone_number: string | null;
    avatar: string | null;
    updated_at: string;
    created_at: string | null;
}

const NotificationCell: React.FC<Props> = ({ item }) => {
    // Group the content blocks by the name for easy lookup
    const blocksByName = useMemo(() => {
        return item.blocks.reduce((acc, block) => {
            return { ...acc, [block.name]: block };
        }, {});
    }, [item]);
    const actor = item.actors[0];
    const maybeActor: Recipient | User | undefined = actor;

    return (
        <div className="notification-cell">
            <div className="notification-cell__avatar">
                prueba
            </div>
        </div>
    );
};

export default NotificationCell;