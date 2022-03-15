package com.yatop.lambda.api.common.websocket.initializer;

import com.yatop.lambda.api.common.websocket.codec.TcpPacketCodec;
import com.yatop.lambda.api.common.websocket.codec.TcpSpliter;
import com.yatop.lambda.api.common.websocket.handler.IMIdleStateHandler;
import com.yatop.lambda.api.common.websocket.util.PipelineUtil;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.socket.nio.NioSocketChannel;
import org.springframework.stereotype.Component;

/**
 * tcp连接初始化Channel，给Channel关联的pipeline添加handler
 *
 * @author mm
 * @date 2019-04-22
 */
@Component
public class TcpServerInitializer extends ChannelInitializer<NioSocketChannel> {

    @Override
    protected void initChannel(NioSocketChannel ch) throws Exception {
        ChannelPipeline pipeline = ch.pipeline();

        // 空闲检测
        pipeline.addLast(new IMIdleStateHandler());
        // 处理粘包半包
        pipeline.addLast(new TcpSpliter());
        // 数据包编解码器
        pipeline.addLast(TcpPacketCodec.INSTANCE);

        // 添加tcp/websocket通用handler
        PipelineUtil.addHandler(pipeline);

    }
}
