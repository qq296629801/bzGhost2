package com.yatop.lambda.api.common.websocket.protocol.packet;

import com.yatop.lambda.api.common.websocket.protocol.Packet;
import com.yatop.lambda.api.common.websocket.protocol.command.Command;
import lombok.Data;

/**
 * @author mm
 * @date 2019-04-21
 */
@Data
public class LogoutRequestPacket extends Packet {

    @Override
    public Byte getCommand() {
        return Command.LOGOUT_REQUEST;
    }
}
