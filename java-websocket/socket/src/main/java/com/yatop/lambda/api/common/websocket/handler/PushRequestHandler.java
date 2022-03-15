package com.yatop.lambda.api.common.websocket.handler;

import cn.hutool.core.bean.BeanUtil;
import com.yatop.lambda.api.common.websocket.protocol.packet.PushPacket;
import com.yatop.lambda.api.common.websocket.protocol.packet.PushRequestPacket;
import com.yatop.lambda.api.common.websocket.session.Tio;
import com.yatop.lambda.api.common.websocket.util.PushEnum;
import io.netty.channel.ChannelHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;

@ChannelHandler.Sharable
public class PushRequestHandler extends SimpleChannelInboundHandler<PushRequestPacket> {
    public static final PushRequestHandler INSTANCE = new PushRequestHandler();


    @Override
    protected void channelRead0(ChannelHandlerContext c, PushRequestPacket req) throws Exception {
        PushPacket packet = new PushPacket(PushEnum.valueOf(req.getCode()));
        BeanUtil.copyProperties(req, packet);
        Tio.sendToAll(packet, c);
    }
}
