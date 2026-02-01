package com.eazybytes.eazystore.service;

import com.eazybytes.eazystore.dto.request.ContactRequestDto;
import com.eazybytes.eazystore.dto.response.ContactResponseDto;

import java.util.List;

public interface IContactService {

    boolean saveContact(ContactRequestDto contactRequestDto);

    List<ContactResponseDto> getAllOpenMessages();

    void updateMessageStatus(Long contactId, String status);
}
