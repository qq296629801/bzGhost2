package com.yatop.lambda.api.common.websocket.protocol.packet;

import com.yatop.lambda.api.common.websocket.protocol.Packet;
import com.yatop.lambda.api.common.websocket.protocol.command.Command;
import lombok.Data;

@Data
public class PushRequestPacket extends Packet {
    private int code;
    private String eventValue;
    private String eventObj;


    @Override
    public Byte getCommand() {
        return Command.PUSH_REQUEST;
    }
}
