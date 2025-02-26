package com.jetty.ssafficebe.common.config;

import co.elastic.clients.transport.TransportUtils;
import javax.net.ssl.SSLContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;

@Configuration
public class ESConfig extends ElasticsearchConfiguration {

    @Value("${spring.elasticsearch.uris}")
    private String host;

    @Value("${spring.elasticsearch.username}")
    private String username;

    @Value("${spring.elasticsearch.password}")
    private String password;

    @Value("${spring.elasticsearch.fingerprint}")
    private String fingerprint;


    @Override
    public ClientConfiguration clientConfiguration() {
        SSLContext sslContext = TransportUtils.sslContextFromCaFingerprint(fingerprint);
        return ClientConfiguration.builder()
                                  .connectedTo(host)
                                  .usingSsl(sslContext, (hostname, session) -> true) // ssl 사용
                                  .withBasicAuth(username, password)
                                  .build();

    }
}