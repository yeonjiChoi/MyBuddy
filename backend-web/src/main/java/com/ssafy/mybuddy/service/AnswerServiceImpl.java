package com.ssafy.mybuddy.service;

import com.ssafy.mybuddy.dto.AnswerDto;
import com.ssafy.mybuddy.mapper.AnswerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AnswerServiceImpl implements AnswerService{
    private AnswerMapper answerMapper;

    @Autowired
    public AnswerServiceImpl(AnswerMapper answerMapper){

        this.answerMapper = answerMapper;
    }


    @Override
    public boolean registAnswer(AnswerDto dto) throws Exception {
        return answerMapper.registAnswer(dto) == 1;
    }

    @Override
    public boolean updateAnswer(AnswerDto dto) throws Exception {
        return answerMapper.updateAnswer(dto) == 1;
    }

    @Override
    public boolean deleteAnswer(int id) throws Exception {
        return answerMapper.deleteAnswer(id) == 1;
    }

    @Override
    public List<AnswerDto> detailAnswer(Map<String, Integer> ids) throws Exception {
        return answerMapper.detailAnswer(ids);
    }

    @Override
    public List<AnswerDto> allAnswers(int id) throws Exception {
        return answerMapper.allAnswers(id);
    }
}
