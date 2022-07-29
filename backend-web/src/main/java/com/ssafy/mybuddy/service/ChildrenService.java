package com.ssafy.mybuddy.service;


import com.ssafy.mybuddy.dto.ChildrenDto;

import java.util.List;

public interface ChildrenService {
    boolean insertChildren(ChildrenDto childrenDto);

    List<ChildrenDto> retrieveChildren(int memberId);

    ChildrenDto selectChildren(int childrenId);

    boolean updateChildren(ChildrenDto childrenDto);

    boolean deleteChildren(int childrenId);
}
