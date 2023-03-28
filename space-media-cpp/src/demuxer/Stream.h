#pragma once

#include <cstdint>

namespace SpaceMedia 
{
  class Stream
  {
    public:
      Stream(long id, long type): m_id {id}, m_type {type} {}
      const long& id() const { return m_id; }
      const long& type() const { return m_type; }
    private:
      long m_id;
      long m_type;
  };
}