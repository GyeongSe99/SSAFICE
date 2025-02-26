package com.jetty.ssafficebe.search.repository;

import com.jetty.ssafficebe.search.document.ESUser;
import java.io.IOException;
import java.util.List;

public interface ESUserRepositoryCustom {

    List<ESUser> searchUsers(String keyword) throws IOException;
}