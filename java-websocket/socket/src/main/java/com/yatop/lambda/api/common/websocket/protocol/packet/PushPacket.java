package com.yatop.lambda.api.common.websocket.protocol.packet;

import com.yatop.lambda.api.common.websocket.protocol.Packet;
import com.yatop.lambda.api.common.websocket.protocol.command.Command;
import com.yatop.lambda.api.common.websocket.util.PushEnum;
import lombok.Data;

@Data
public class PushPacket extends Packet {
    private int code;
    private String msg;
    private String eventValue;
    private String eventObj;

    public PushPacket(PushEnum pushEnum) {
        this.code = pushEnum.getCode();
        this.msg = pushEnum.getMsg();
    }


    @Override
    public Byte getCommand() {
        return Command.PUSH_RES;
    }
}
