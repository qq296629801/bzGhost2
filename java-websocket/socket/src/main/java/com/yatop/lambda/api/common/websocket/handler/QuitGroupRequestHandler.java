package com.yatop.lambda.api.common.websocket.handler;

import com.yatop.lambda.api.common.websocket.protocol.packet.QuitGroupRequestPacket;
import com.yatop.lambda.api.common.websocket.protocol.packet.QuitGroupResponsePacket;
import com.yatop.lambda.api.common.websocket.session.Tio;
import io.netty.channel.ChannelHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;

@ChannelHandler.Sharable
public class QuitGroupRequestHandler extends SimpleChannelInboundHandler<QuitGroupRequestPacket> {

    public static final QuitGroupRequestHandler INSTANCE = new QuitGroupRequestHandler();

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, QuitGroupRequestPacket req) throws Exception {

        QuitGroupResponsePacket res = new QuitGroupResponsePacket();
        res.setSuccess(true);

        if (req.getChatType() == 1) {
            Tio.quitGroup(req.getChatId(), ctx.channel());
        }

        Tio.send(ctx, req, res);
    }
}
