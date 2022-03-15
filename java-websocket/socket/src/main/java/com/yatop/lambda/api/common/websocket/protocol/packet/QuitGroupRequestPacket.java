package com.yatop.lambda.api.common.websocket.protocol.packet;

import com.yatop.lambda.api.common.websocket.protocol.Packet;
import com.yatop.lambda.api.common.websocket.protocol.command.Command;
import lombok.Data;

@Data
public class QuitGroupRequestPacket extends Packet {
    private String chatId;
    private int chatType;

    @Override
    public Byte getCommand() {
        return Command.QUIT_GROUP_REQUEST;
    }
}
